export default class ColumnDefinition {
  constructor(props) {
    const {
      key,
      label,
      formatter
    } = props;
    
    this.key = key;
    this.label = label;
    this.formatter = formatter || ColumnDefinition.defaultFormatter;
  }

  static defaultFormatter (val) {
    return val.toString();
  }
}