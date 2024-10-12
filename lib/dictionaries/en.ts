// To parse this data:
//
//   import { Convert, En } from "./file";
//
//   const en = Convert.toEn(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface En {
    common:         Common;
    components:     Components;
    navigation:     Navigation;
    search:         EnSearch;
    lists:          Lists;
    lists_details:  ListsDetails;
    home_page:      HomePage;
    settings_page:  SettingsPage;
    notifiacations: Notifiacations;
    ALL_CATEGORIES: AllCategory[];
}

export interface AllCategory {
    value: string;
    label: string;
}

export interface Common {
    social_media:     string;
    add_to_list:      string;
    new_list:         string;
    name:             string;
    category:         string;
    price:            string;
    quantity:         string;
    products:         string;
    list:             string;
    title:            string;
    description:      string;
    tags:             string;
    created_at:       string;
    updated_at:       string;
    list_name:        string;
    list_description: string;
    save:             string;
    saving:           string;
    delete:           string;
    deleting:         string;
    confirm_delete:   string;
    edit:             string;
    search:           string;
    add:              string;
    add_products:     string;
    currency:         string;
    low:              string;
    medium:           string;
    high:             string;
    brand:            string;
    average:          string;
}

export interface Components {
    search:           ComponentsSearch;
    spending_section: SpendingSection;
}

export interface ComponentsSearch {
    input:              string;
    filter_by_category: string;
    filter_by_price:    string;
}

export interface SpendingSection {
    spending_by_category: string;
    total_products:       string;
    total_spending:       string;
}

export interface HomePage {
    title:                    string;
    description:              string;
    price_distribution:       Lists;
    market_share:             MarketShare;
    average_price_by_brand:   AveragePriceByBrand;
    price_range_distribution: Lists;
    results_helpText:         string;
}

export interface AveragePriceByBrand {
    title:       string;
    description: string;
    no_brands:   string;
}

export interface MarketShare {
    title:       string;
    description: string;
    helpText:    string;
}

export interface Lists {
    title:       string;
    description: string;
}

export interface ListsDetails {
    no_products:             string;
    title_placeholder:       string;
    description_placeholder: string;
}

export interface Navigation {
    home:     string;
    search:   string;
    list:     string;
    settings: string;
}

export interface Notifiacations {
    was_updated: string;
}

export interface EnSearch {
    title:                  string;
    description:            string;
    disclaimer_title:       string;
    disclaimer_description: string;
}

export interface SettingsPage {
    title:                string;
    description:          string;
    currency:             string;
    currency_description: string;
    currency_helpText:    string;
    language:             string;
    language_description: string;
    language_helpText:    string;
    theme:                string;
    theme_description:    string;
    theme_helpText:       string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toEn(json: string): En {
        return cast(JSON.parse(json), r("En"));
    }

    public static enToJson(value: En): string {
        return JSON.stringify(uncast(value, r("En")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "En": o([
        { json: "common", js: "common", typ: r("Common") },
        { json: "components", js: "components", typ: r("Components") },
        { json: "navigation", js: "navigation", typ: r("Navigation") },
        { json: "search", js: "search", typ: r("EnSearch") },
        { json: "lists", js: "lists", typ: r("Lists") },
        { json: "lists_details", js: "lists_details", typ: r("ListsDetails") },
        { json: "home_page", js: "home_page", typ: r("HomePage") },
        { json: "settings_page", js: "settings_page", typ: r("SettingsPage") },
        { json: "notifiacations", js: "notifiacations", typ: r("Notifiacations") },
        { json: "ALL_CATEGORIES", js: "ALL_CATEGORIES", typ: a(r("AllCategory")) },
    ], false),
    "AllCategory": o([
        { json: "value", js: "value", typ: "" },
        { json: "label", js: "label", typ: "" },
    ], false),
    "Common": o([
        { json: "social_media", js: "social_media", typ: "" },
        { json: "add_to_list", js: "add_to_list", typ: "" },
        { json: "new_list", js: "new_list", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "category", js: "category", typ: "" },
        { json: "price", js: "price", typ: "" },
        { json: "quantity", js: "quantity", typ: "" },
        { json: "products", js: "products", typ: "" },
        { json: "list", js: "list", typ: "" },
        { json: "title", js: "title", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "tags", js: "tags", typ: "" },
        { json: "created_at", js: "created_at", typ: "" },
        { json: "updated_at", js: "updated_at", typ: "" },
        { json: "list_name", js: "list_name", typ: "" },
        { json: "list_description", js: "list_description", typ: "" },
        { json: "save", js: "save", typ: "" },
        { json: "saving", js: "saving", typ: "" },
        { json: "delete", js: "delete", typ: "" },
        { json: "deleting", js: "deleting", typ: "" },
        { json: "confirm_delete", js: "confirm_delete", typ: "" },
        { json: "edit", js: "edit", typ: "" },
        { json: "search", js: "search", typ: "" },
        { json: "add", js: "add", typ: "" },
        { json: "add_products", js: "add_products", typ: "" },
        { json: "currency", js: "currency", typ: "" },
        { json: "low", js: "low", typ: "" },
        { json: "medium", js: "medium", typ: "" },
        { json: "high", js: "high", typ: "" },
        { json: "brand", js: "brand", typ: "" },
        { json: "average", js: "average", typ: "" },
    ], false),
    "Components": o([
        { json: "search", js: "search", typ: r("ComponentsSearch") },
        { json: "spending_section", js: "spending_section", typ: r("SpendingSection") },
    ], false),
    "ComponentsSearch": o([
        { json: "input", js: "input", typ: "" },
        { json: "filter_by_category", js: "filter_by_category", typ: "" },
        { json: "filter_by_price", js: "filter_by_price", typ: "" },
    ], false),
    "SpendingSection": o([
        { json: "spending_by_category", js: "spending_by_category", typ: "" },
        { json: "total_products", js: "total_products", typ: "" },
        { json: "total_spending", js: "total_spending", typ: "" },
    ], false),
    "HomePage": o([
        { json: "title", js: "title", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "price_distribution", js: "price_distribution", typ: r("Lists") },
        { json: "market_share", js: "market_share", typ: r("MarketShare") },
        { json: "average_price_by_brand", js: "average_price_by_brand", typ: r("AveragePriceByBrand") },
        { json: "price_range_distribution", js: "price_range_distribution", typ: r("Lists") },
        { json: "results_helpText", js: "results_helpText", typ: "" },
    ], false),
    "AveragePriceByBrand": o([
        { json: "title", js: "title", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "no_brands", js: "no_brands", typ: "" },
    ], false),
    "MarketShare": o([
        { json: "title", js: "title", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "helpText", js: "helpText", typ: "" },
    ], false),
    "Lists": o([
        { json: "title", js: "title", typ: "" },
        { json: "description", js: "description", typ: "" },
    ], false),
    "ListsDetails": o([
        { json: "no_products", js: "no_products", typ: "" },
        { json: "title_placeholder", js: "title_placeholder", typ: "" },
        { json: "description_placeholder", js: "description_placeholder", typ: "" },
    ], false),
    "Navigation": o([
        { json: "home", js: "home", typ: "" },
        { json: "search", js: "search", typ: "" },
        { json: "list", js: "list", typ: "" },
        { json: "settings", js: "settings", typ: "" },
    ], false),
    "Notifiacations": o([
        { json: "was_updated", js: "was_updated", typ: "" },
    ], false),
    "EnSearch": o([
        { json: "title", js: "title", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "disclaimer_title", js: "disclaimer_title", typ: "" },
        { json: "disclaimer_description", js: "disclaimer_description", typ: "" },
    ], false),
    "SettingsPage": o([
        { json: "title", js: "title", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "currency", js: "currency", typ: "" },
        { json: "currency_description", js: "currency_description", typ: "" },
        { json: "currency_helpText", js: "currency_helpText", typ: "" },
        { json: "language", js: "language", typ: "" },
        { json: "language_description", js: "language_description", typ: "" },
        { json: "language_helpText", js: "language_helpText", typ: "" },
        { json: "theme", js: "theme", typ: "" },
        { json: "theme_description", js: "theme_description", typ: "" },
        { json: "theme_helpText", js: "theme_helpText", typ: "" },
    ], false),
};
