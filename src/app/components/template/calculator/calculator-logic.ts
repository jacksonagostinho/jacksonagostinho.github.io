
export class CalculatorLogic {

  private _operations :string[] = ['%', '-', '+', '/','*'];
  private _currentOperation: string = '';
  private _value1: string = '';
  private _value2: string = '';
  private _msgError: string = '';

  constructor() { }

  input(value: string): void {
    if (this._operations.includes(value) === true) {
        this._currentOperation = value;
    }

    if ('CE' === value) {
        this.clean();
        return;
    }

    if(('=' !== value) && (this._currentOperation === '' || (this._currentOperation === '-' && this._value1 === ''))) {
        if (value !== '.' || this._value1.includes('.') === false) {
            this._value1 += value;
        }
        if(this._currentOperation === '-') {
            this._currentOperation = '';
        }
    } else if (this._currentOperation !== value) {
        if (value !== '.' || this._value2.includes('.') === false) {
            this._value2 += value;
        }
    }

    if (('=' === value && this._value2 !== '') || ('%' === value && this._value1 !== '')) {
        try {
            let value1: number = parseFloat(this._value1);
            let value2: number = parseFloat(this._value2);
                        
            let result: number = this.toCalculate(value1, value2, this._currentOperation);

            if(!isNaN(result)) {
                this._value1 = String(result);
            } else {
                this._value1 = '';
            }
            this._value2 = '';            
        }
        catch(e) {
            this._value1 = '';
            this._value2 = '';
            this._msgError = String(e);
        }
        return;
    }
  }

  clean(): void {
    this._value1 = '';
    this._value2 = '';
    this._currentOperation = '';
    this._msgError = '';
  }

  display(): string {
    if (this._msgError !== '') {
        return this._msgError;
    } 

    if (this._value2 !== '') {
        return this._value2;
    } else if (this._value1 !== '') {
        return this._value1
    }

    return '0';
  }


  toCalculate(value1: number, value2: number, currentOperation: string): number {
    switch(currentOperation) { 
        case "+": {
            if (!isNaN(value2)) {
                value1 += value2;
            }
            break; 
        } 
        case "-": { 
            if (!isNaN(value2)) {
                value1 -= value2;
            }
            break; 
        }  
        case "*": { 
            if (!isNaN(value2)) {
                value1 = value1 * value2;
            }
            break; 
        } 
        case "/": { 
            if (value2 === 0) {
                throw new Error('Zero division');
            }
            if (!isNaN(value2)) {
                value1 = value1 / value2;
            }
            break;
        } 
        case "%": {
            if (!isNaN(value1)) {
                value1 = value1 / 100;
            }
            break;
        }
        default: { 
            // throw new Error('Not found operation');
            break;
        } 
    } 
    return value1;
  }

}