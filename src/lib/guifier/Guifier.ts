export type DataFormat = 'json' | 'yaml' | 'xml' | 'toml' | 'js';

export interface GuifierParams {
  target: Element;
  data: string | object;
  dataType: DataFormat;
}

export class Guifier {
  public target: Element;
  public data: string | object;
  public dataType: DataFormat;

  constructor(params: GuifierParams) {
    this.target = params.target;
    this.data = params.data;
    this.dataType = params.dataType;
  }

  public getData(format: DataFormat): Array<unknown> | Record<string, unknown> {
  }

  /**
   * Set new data into the GUI (and re‑render it).
   * @param data the new data (string or object) 
   * @param format the format of the passed data
   */
  public setData(data: string | object, format: DataFormat): void {
    this.data = data;
    this.dataType = format;
    // rebuild or update GUI representation in container
  }

  /**
   * Destroy/cleanup the GUI and remove any event listeners.
   */
  public destroy(): void {
    // cleanup logic: remove GUI from container, unsubscribe, etc.
    this.initialized = false;
  }
}
