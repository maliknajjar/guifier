import type { GuifierData } from "./guifier.svelte";

import { load as loadYaml, dump as dumpYaml } from 'js-yaml'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import lodash from 'lodash'
import { TomlDate, parse as parseToml, stringify as tomlStringify } from 'smol-toml'

export function isPlainObject(value: unknown): value is Record<string, unknown> {
	return (
		typeof value === "object" &&
		value !== null &&
		Object.getPrototypeOf(value) === Object.prototype
	);
}

export function isContainerValue(value: unknown): boolean {
	return Boolean(isPlainObject(value) || Array.isArray(value));
}

export type DataType = 'json' | 'yaml' | 'xml' | 'toml';

export function encode(dataType: DataType, data: string): GuifierData {
	if (dataType === 'json') {
		return JSON.parse(data);
	} else if (dataType === 'yaml') {
		return loadYaml(data) as GuifierData;
	} else if (dataType === 'toml') {
		return parseToml(data);
	} else if (dataType === 'xml') {
		const parsedData = (new XMLParser()).parse(data)
		const rootNodeName = Object.keys(parsedData)[0]
		const returnedData = parsedData[rootNodeName]
		return returnedData
	} else {
		throw new Error(`The (${dataType}) is not supported in guifier (encode) function`)
	}
}

export function decode(dataType: DataType, data: GuifierData): string {
    if (dataType === 'json') {
		return JSON.stringify(data, null, 2);
	} else if (dataType === 'yaml') {
		return dumpYaml(data);
	} else if (dataType === 'toml') {
		const processedData = lodash.cloneDeepWith(data, (value: unknown) => {
			if (value instanceof Date) {
				value = new TomlDate(value.toISOString().split('T')[0])
				return value
			}
		})

		return tomlStringify(processedData)
	} else if (dataType === 'xml') {
		const returnedObject = {root: {}}
		returnedObject.root = data
		return (new XMLBuilder({
			format: true,
			indentBy: "  ",
			suppressEmptyNode: false
		})).build(returnedObject)
	} else {
		throw new Error(`The (${dataType}) is not supported in guifier (decode) function`);
	}
}
