import { WriteStream, createWriteStream } from "fs";
import { join } from "path";
import { PlatformUnion } from "../../types/platform";

export type WriteStreamMap = Partial<Record<string, WriteStream>>;
export type WriteStreamsMap = Partial<Record<PlatformUnion, WriteStreamMap>>;
export type EventMap = Record<string, (format: PlatformUnion, context: string, streams: WriteStreamsMap) => void>;
export class ContextStreams {
  streams: WriteStreamsMap;

  events: EventMap;

  constructor(events: EventMap) {
    this.streams = {};
    this.events = events;
  }

  getStreams(
    format: PlatformUnion,
    context: string,
    buildPath: string
  ): WriteStream | WriteStreamMap | WriteStreamsMap {
    if (!format) {
      return this.streams;
    }

    if (!context) {
      if (!this.streams[format]) {
        this.streams[format] = {};
      }
      return this.streams[format];
    }

    if (!this.streams[format][context]) {
      this.streams[format][context] = this.createStream(format, context, buildPath);
    }

    return this.streams[format][context];
  }

  getStream(format: PlatformUnion, context: string, buildPath: string): WriteStream {
    if (!this.streams[format]) {
      this.streams[format] = {};
    }

    if (!this.streams[format][context]) {
      this.streams[format][context] = this.createStream(format, context, buildPath);
    }

    return this.streams[format][context];
  }

  add(str: string, args: { format: PlatformUnion; context: string; buildPath: string }): void {
    const stream = this.getStream(args.format, args.context, args.buildPath);
    stream.write(str);
    stream.write("\n");
  }

  createStream(format: PlatformUnion, context: string, buildPath: string): WriteStream {
    const path = join(
      buildPath.includes(format) ? buildPath.slice(0, buildPath.indexOf(format)) : buildPath,
      format,
      `${context}.${format}`
    );
    const newStream = createWriteStream(path, { autoClose: true });

    Object.entries(this.events).forEach(([event, cb]) => {
      newStream.on(event, () => cb(format, context, this.streams));
    });

    return newStream;
  }
}
