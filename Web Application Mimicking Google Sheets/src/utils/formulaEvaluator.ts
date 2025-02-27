type CellValue = string | number;

export class FormulaEvaluator {
  private cells: Record<string, CellValue>;

  constructor(cells: Record<string, CellValue>) {
    this.cells = cells;
  }

  evaluate(formula: string, cellId: string): number | string {
    if (!formula.startsWith('=')) return formula;

    const normalizedFormula = formula.substring(1).toUpperCase();
    const functionMatch = normalizedFormula.match(/^([A-Z]+)\((.*)\)$/);

    if (!functionMatch) return this.evaluateBasicFormula(normalizedFormula);

    const [, functionName, args] = functionMatch;
    const evaluatedArgs = this.evaluateArguments(args);

    switch (functionName) {
      case 'SUM':
        return this.sum(evaluatedArgs);
      case 'AVERAGE':
        return this.average(evaluatedArgs);
      case 'MAX':
        return this.max(evaluatedArgs);
      case 'MIN':
        return this.min(evaluatedArgs);
      case 'COUNT':
        return this.count(evaluatedArgs);
      case 'TRIM':
        return this.trim(evaluatedArgs[0]);
      case 'UPPER':
        return this.upper(evaluatedArgs[0]);
      case 'LOWER':
        return this.lower(evaluatedArgs[0]);
      default:
        return '#ERROR!';
    }
  }

  private evaluateArguments(args: string): any[] {
    return args.split(',').map(arg => {
      const range = arg.trim().match(/([A-Z]+[0-9]+):([A-Z]+[0-9]+)/);
      if (range) {
        return this.evaluateRange(range[1], range[2]);
      }
      return this.evaluateSingle(arg.trim());
    });
  }

  private evaluateRange(start: string, end: string): number[] {
    const values: number[] = [];
    // Implementation for range evaluation
    return values;
  }

  private evaluateSingle(ref: string): number | string {
    return this.cells[ref] || 0;
  }

  private evaluateBasicFormula(formula: string): number {
    try {
      // Basic arithmetic evaluation
      return eval(formula);
    } catch {
      return '#ERROR!';
    }
  }

  private sum(args: any[]): number {
    return args.flat().reduce((sum: number, val: any) => sum + (Number(val) || 0), 0);
  }

  private average(args: any[]): number {
    const numbers = args.flat().filter(val => !isNaN(Number(val)));
    return numbers.length ? this.sum(numbers) / numbers.length : 0;
  }

  private max(args: any[]): number {
    return Math.max(...args.flat().map(val => Number(val) || -Infinity));
  }

  private min(args: any[]): number {
    return Math.min(...args.flat().map(val => Number(val) || Infinity));
  }

  private count(args: any[]): number {
    return args.flat().filter(val => !isNaN(Number(val))).length;
  }

  private trim(value: string): string {
    return String(value).trim();
  }

  private upper(value: string): string {
    return String(value).toUpperCase();
  }

  private lower(value: string): string {
    return String(value).toLowerCase();
  }
}