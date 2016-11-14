export class Validator {
  types: any;
  messages: any;
  config: any;

  constructor() {
    this.types = {};
    this.messages = [];
    this.config = {};
    this.addRule();
  }

  validate(data: any) {

    this.messages = [];
    for (var i in data) {
      if (data.hasOwnProperty(i)) {
        var type = this.config[i];
        var checker = this.types[type];

        if (!type) {
          continue;
        }

        if (!checker) {
          throw {
            name: "ValidationError",
            message: "No handler to validate type" + type
          };
        }

        var resultOk = checker.validate[data[i]];
        if (!resultOk) {
          var msg = "Invalid value *" + i + "*," + checker.instructions;
          this.messages.push(msg);
        }
      }
    }
    return this.hasErrors();
  }

  hasErrors() {
    return this.messages.length !== 0;
  }

  /**
   * 個別定義驗證規則
   */
  private addRule() {
    this.types.isNonEmpty = {
      validate: (value: string) => {
        return (value.replace(/(^\s*)|(\s*$)/g, "").length == 0);
      },
      instructions: "the value cannot be empty"
    }

  }
}
