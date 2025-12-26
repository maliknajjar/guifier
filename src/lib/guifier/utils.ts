import type { GuifierData } from "./guifier.svelte";

import { load as loadYaml, dump as dumpYaml } from 'js-yaml'
import { XMLParser, XMLBuilder } from 'fast-xml-parser'
import lodash from 'lodash'
import { TomlDocument, TomlFormat, stringify as tomlStringify } from '@decimalturn/toml-patch'

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

// Track single TOML document to preserve formatting across encode/decode cycles
let currentTomlDocument: TomlDocument | null = null;

export function encode(dataType: DataType, data: string): GuifierData {
	if (dataType === 'json') {
		return JSON.parse(data);
	} else if (dataType === 'yaml') {
		return loadYaml(data) as GuifierData;
	} else if (dataType === 'toml') {
		currentTomlDocument = new TomlDocument(data);
		return currentTomlDocument.toJsObject as GuifierData;
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
				value = new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()))
				return value
			}
		})

		const format = TomlFormat.default()
		format.truncateZeroTimeInDates = true

		if (currentTomlDocument) {
			currentTomlDocument.patch(processedData, format)
			return currentTomlDocument.toTomlString
		} else {
			// Fallback: create new document and store it (formatting will be lost).
			const tomlString = tomlStringify(processedData, format)
			currentTomlDocument = new TomlDocument(tomlString)
			return currentTomlDocument.toTomlString
		}
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
