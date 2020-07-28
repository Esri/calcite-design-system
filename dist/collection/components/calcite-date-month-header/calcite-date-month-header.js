import { Component, Element, Prop, Host, Event, h, } from "@stencil/core";
import { getLocaleFormatData, replaceArabicNumerals, getMonths, getYear, } from "../../utils/locale";
import { getElementDir } from "../../utils/dom";
import { dateFromRange, nextMonth, prevMonth } from "../../utils/date";
import { getKey } from "../../utils/key";
export class CalciteDateMonthHeader {
    //--------------------------------------------------------------------------
    //
    //  Lifecycle
    //
    //--------------------------------------------------------------------------
    render() {
        const activeMonth = this.activeDate.getMonth();
        const localizedMonth = getMonths(this.locale)[activeMonth];
        const localizedYear = getYear(this.activeDate, this.locale);
        const iconScale = this.scale === "l" ? "m" : "s";
        const dir = getElementDir(this.el);
        const nextMonthDate = dateFromRange(nextMonth(this.activeDate), this.min, this.max);
        const prevMonthDate = dateFromRange(prevMonth(this.activeDate), this.min, this.max);
        return (h(Host, { dir: dir },
            h("div", { class: "header", "aria-hidden": "true" },
                h("button", { class: "chevron", "aria-label": this.intlPrevMonth, disabled: prevMonthDate.getMonth() === activeMonth, onClick: () => this.calciteActiveDateChange.emit(prevMonthDate) },
                    h("calcite-icon", { icon: "chevron-left", scale: iconScale, mirrored: true, dir: dir })),
                h("div", { class: "text" },
                    h("span", { class: "month", role: "heading" }, localizedMonth),
                    h("input", { class: "year", type: "text", inputmode: "numeric", maxlength: "4", minlength: "4", pattern: "\\d*", value: `${localizedYear.slice(-4)}`, onKeyDown: (event) => this.onYearKey(event), onChange: (event) => this.setYear(event.target.value), ref: (el) => (this.yearInput = el) })),
                h("button", { class: "chevron", "aria-label": this.intlNextMonth, disabled: nextMonthDate.getMonth() === activeMonth, onClick: () => this.calciteActiveDateChange.emit(nextMonthDate) },
                    h("calcite-icon", { icon: "chevron-right", scale: iconScale, mirrored: true, dir: dir })))));
    }
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    /**
     * Increment year on UP/DOWN keys
     */
    onYearKey(e) {
        const year = e.target.value;
        switch (getKey(e.key)) {
            case "ArrowDown":
                e.preventDefault();
                this.setYear(year, -1);
                break;
            case "ArrowUp":
                e.preventDefault();
                this.setYear(year, 1);
                break;
        }
    }
    /**
     * Parse localized year string from input,
     * set to active if in range
     */
    setYear(localizedYear, increment = 0) {
        const { min, max, activeDate, locale, yearInput } = this;
        const parsedYear = parseInt(replaceArabicNumerals(localizedYear));
        const length = parsedYear.toString().length;
        const offset = getLocaleFormatData(locale).buddhist ? 543 : 0;
        const year = isNaN(parsedYear) ? false : parsedYear - offset + increment;
        const inRange = year &&
            (!min || min.getFullYear() <= year) &&
            (!max || max.getFullYear() >= year);
        // if you've supplied a year and it's in range, update active date
        if (year && inRange && length === localizedYear.length && length > 3) {
            const nextDate = new Date(activeDate);
            nextDate.setFullYear(year);
            const inRangeDate = dateFromRange(nextDate, min, max);
            this.calciteActiveDateChange.emit(inRangeDate);
            yearInput.value = getYear(inRangeDate, locale).slice(-4);
        }
        else {
            // leave the current active date and clean up garbage input
            yearInput.value = getYear(activeDate, locale).slice(-4);
        }
    }
    static get is() { return "calcite-date-month-header"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["calcite-date-month-header.scss"]
    }; }
    static get styleUrls() { return {
        "$": ["calcite-date-month-header.css"]
    }; }
    static get properties() { return {
        "selectedDate": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Date",
                "resolved": "Date",
                "references": {
                    "Date": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Already selected date."
            }
        },
        "activeDate": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Date",
                "resolved": "Date",
                "references": {
                    "Date": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Focused date with indicator (will become selected date if user proceeds)"
            }
        },
        "min": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Date",
                "resolved": "Date",
                "references": {
                    "Date": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Minimum date of the calendar below which is disabled."
            }
        },
        "max": {
            "type": "unknown",
            "mutable": false,
            "complexType": {
                "original": "Date",
                "resolved": "Date",
                "references": {
                    "Date": {
                        "location": "global"
                    }
                }
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Maximum date of the calendar above which is disabled."
            }
        },
        "locale": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "User's language and region as BCP 47 formatted string."
            },
            "attribute": "locale",
            "reflect": false
        },
        "intlPrevMonth": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Localized string for previous month."
            },
            "attribute": "intl-prev-month",
            "reflect": false
        },
        "intlNextMonth": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "Localized string for next month."
            },
            "attribute": "intl-next-month",
            "reflect": false
        },
        "scale": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "\"s\" | \"m\" | \"l\"",
                "resolved": "\"l\" | \"m\" | \"s\"",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "specify the scale of the date picker"
            },
            "attribute": "scale",
            "reflect": true
        }
    }; }
    static get events() { return [{
            "method": "calciteActiveDateChange",
            "name": "calciteActiveDateChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Changes to active date"
            },
            "complexType": {
                "original": "Date",
                "resolved": "Date",
                "references": {
                    "Date": {
                        "location": "global"
                    }
                }
            }
        }]; }
    static get elementRef() { return "el"; }
}
