export interface IColumnDefinitionProps {
  key: string,
  label: any,
  formatter?: (val: any) => string
}

export default class ColumnDefinition {
  public formatter?: (val: any) => string;
  public key: string;
  public label: string;

  constructor(props: IColumnDefinitionProps) {
    const {
      key,
      label,
      formatter
    } = props;
    
    this.key = key;
    this.label = label;
    this.formatter = formatter || ColumnDefinition.defaultFormatter;
  }

  private static defaultFormatter (val: any): string {
    return val.toString();
  }
}