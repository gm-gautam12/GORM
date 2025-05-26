import { PropertyType } from '../entity-definition/EntityDefinition.js';

export interface PropertyDefinition {
    name:string;
    type: PropertyType;
    nullable?: boolean;
    unique?: boolean;
}

export function defineProperty(def:PropertyDefinition):PropertyDefinition {
    return def;
}