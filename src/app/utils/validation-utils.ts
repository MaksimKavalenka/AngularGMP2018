export abstract class ValidationUtils {

  public static isNumber(value: any): boolean {
    return Number.isInteger(+value);
  }

}
