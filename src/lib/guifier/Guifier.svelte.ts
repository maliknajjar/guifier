import { mount } from "svelte";
import GuifierComponent, { type GuifierData } from "./guifier.svelte"

export type DataType = 'json' | 'yaml' | 'xml' | 'toml' | 'js';

export interface GuifierClassParams {
  target: Element;
  dataType: DataType;
  data: string | GuifierData;
}

export interface State {
  data: GuifierData;
}

export class Guifier {
  public raw_data: string | GuifierData;
  public target: Element;
  public dataType: DataType;
  public state: State;

  constructor(params: GuifierClassParams) {
    this.target = params.target;
    this.raw_data = params.data;
    this.dataType = params.dataType;
    this.state = $state({
      data: this.parseRawData(this.raw_data),
    });
    this.init();
  }

  private init() {
    const component = mount(GuifierComponent, {
        target: this.target,
        props: this.state
    })
    this.state.data = { wow: "wwww" }
  }

  public getData(format: DataType): GuifierData {
  }

  public setData(data: string | GuifierData, format: DataType): void {
    this.state.data = { wow: "wwww" }
  }

  private parseRawData(raw_data: string | GuifierData): GuifierData {
    if (typeof raw_data !== "string") {
      return raw_data;
    }
    // handle parsing this based on the dataType
    return raw_data;
  }
}
