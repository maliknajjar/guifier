import { mount } from "svelte";
import GuifierComponent, { type GuifierData } from "./guifier.svelte"

export type DataType = 'json' | 'yaml' | 'xml' | 'toml' | 'js';

interface GuifierClassParamsBase {
  target: Element;
}

// Use discriminated union:
type GuifierClassDataParams = (
  | {
    dataType: 'js';
    data: GuifierData
  }
  | {
    dataType: Exclude<DataType, 'js'>;
    data: string
  }
);
export type GuifierClassParams = GuifierClassParamsBase & GuifierClassDataParams;

export interface State {
  data: GuifierData;
}

export class Guifier {
  public params: GuifierClassParams;
  public state: State;

  constructor(params: GuifierClassParams) {
    this.params = params;
    this.state = $state({
      data: this.parseRawData(this.params),
    });
    this.init();
  }

  private init() {
    const component = mount(GuifierComponent, {
        target: this.params.target,
        props: this.state
    })
    this.state.data = { wow: "wwww" }
  }

  public getData(format: DataType): GuifierData {
    return this.state.data;
  }

  public setData(params: GuifierClassDataParams): void {
    this.state.data = this.parseRawData(params);
  }

  private parseRawData(params: GuifierClassDataParams): GuifierData {
    if (params.dataType === 'js') {
      return params.data;
    } else if (params.dataType === 'json') {
      return JSON.parse(params.data);
    } else if (params.dataType === 'toml') {
      return JSON.parse(params.data);
    } else if (params.dataType === 'xml') {
      return JSON.parse(params.data);
    } else if (params.dataType === 'yaml') {
      return JSON.parse(params.data);
    } else {
      throw new Error(`The (${params.dataType}) data type is not supported (setData) method`);
    }
  }
}
