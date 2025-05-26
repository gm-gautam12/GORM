export type PropertyType = 'string' | 'number' | 'boolean' | 'date';

/* This code snippet is defining an interface named `Property` in TypeScript. The `Property` interface
has the following properties:
- `name`: A string representing the name of the property.
- `type`: A property of type `PropertyType`, which is a union type consisting of 'string', 'number',
'boolean', or 'date'.
- `nullable`: An optional boolean property indicating whether the property can be nullable.
- `unique`: An optional boolean property indicating whether the property should be unique. */
export interface Property {
    name: string;
    type: PropertyType,
    nullable?: boolean;
    unique?: boolean;
};


export interface Relationship {
    type: 'one-to-one' | 'one-to-many' | 'many-to-many';
    targetEntity: string;
    inverseSide?: string;
    joinColumn?: string;
};

export interface EntityDefinition {
    name:string;
    properties: Property[];
    relationships?: Relationship[];
};