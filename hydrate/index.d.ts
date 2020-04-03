export declare function createWindowFromHtml(templateHtml: string, uniqueId: string): any;
export interface Diagnostic {
	level: 'error' | 'warn' | 'info' | 'log' | 'debug';
	type: string;
	header?: string;
	language?: string;
	messageText: string;
	debugText?: string;
	code?: string;
	absFilePath?: string;
	relFilePath?: string;
	lineNumber?: number;
	columnNumber?: number;
	lines?: {
		lineIndex: number;
		lineNumber: number;
		text?: string;
		errorCharStart: number;
		errorLength?: number;
	}[];
}
export interface HydrateDocumentOptions {
	canonicalUrl?: string;
	constrainTimeouts?: boolean;
	clientHydrateAnnotations?: boolean;
	cookie?: string;
	direction?: string;
	excludeComponents?: string[];
	language?: string;
	maxHydrateCount?: number;
	referrer?: string;
	removeScripts?: boolean;
	removeUnusedStyles?: boolean;
	resourcesUrl?: string;
	timeout?: number;
	title?: string;
	url?: string;
	userAgent?: string;
}
export interface SerializeDocumentOptions extends HydrateDocumentOptions {
	afterHydrate?(document: any): any | Promise<any>;
	approximateLineWidth?: number;
	beforeHydrate?(document: any): any | Promise<any>;
	prettyHtml?: boolean;
	removeAttributeQuotes?: boolean;
	removeBooleanAttributeQuotes?: boolean;
	removeEmptyAttributes?: boolean;
	removeHtmlComments?: boolean;
}
export interface HydrateFactoryOptions extends SerializeDocumentOptions {
	serializeToHtml: boolean;
	destroyWindow: boolean;
	destroyDocument: boolean;
}
export interface HydrateResults {
	diagnostics: Diagnostic[];
	url: string;
	host: string;
	hostname: string;
	href: string;
	port: string;
	pathname: string;
	search: string;
	hash: string;
	html: string;
	components: HydrateComponent[];
	anchors: HydrateAnchorElement[];
	styles: HydrateStyleElement[];
	scripts: HydrateScriptElement[];
	imgs: HydrateImgElement[];
	title: string;
	hydratedCount: number;
	httpStatus: number;
}
export interface HydrateComponent {
	tag: string;
	mode: string;
	count: number;
	depth: number;
}
export interface HydrateElement {
	[attrName: string]: string | undefined;
}
export interface HydrateAnchorElement extends HydrateElement {
	href?: string;
	target?: string;
}
export interface HydrateStyleElement extends HydrateElement {
	href?: string;
}
export interface HydrateScriptElement extends HydrateElement {
	src?: string;
	type?: string;
}
export interface HydrateImgElement extends HydrateElement {
	src?: string;
}
export declare function renderToString(html: string | any, options?: SerializeDocumentOptions): Promise<HydrateResults>;
export declare function hydrateDocument(doc: any | string, options?: HydrateDocumentOptions): Promise<HydrateResults>;
export declare function serializeDocumentToString(doc: any, opts: HydrateFactoryOptions): string;

export {};
