import banEvents from "./ban-events";
import banPropsOnHost from "./ban-props-on-host";
import enforceRefLastProp from "./enforce-ref-last-prop";
import noDynamicCreateelement from "./no-dynamic-createelement";
import requireEventEmitterType from "./require-event-emitter-type";
import requireVersionProp from "./require-version-prop";
import strictBooleanAttributes from "./strict-boolean-attributes";

export default {
  "ban-events": banEvents,
  "ban-props-on-host": banPropsOnHost,
  "enforce-ref-last-prop": enforceRefLastProp,
  "no-dynamic-createelement": noDynamicCreateelement,
  "require-event-emitter-type": requireEventEmitterType,
  "require-version-prop": requireVersionProp,
  "strict-boolean-attributes": strictBooleanAttributes,
};
