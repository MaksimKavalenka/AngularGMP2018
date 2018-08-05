export abstract class ArrayUtils {

  public static sort<T>(array: T[], field: string, order: number): T[] {
    if (array) {
      return array.sort((value1, value2) => {
        if (value1[field] > value2[field]) {
          return order;
        }
        if (value1[field] < value2[field]) {
          return -order;
        }
        return 0;
      });
    }
  }

}
