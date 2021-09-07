
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
        console.log('CE -> Clean');
        this.clean();
        return;
    }

    if(this._currentOperation === '' || (this._currentOperation === '-' && this._value1 === '')) {
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

    if ('=' === value || '%' === value || (this._value1 !== '' && this._value2 !== '' && this._operations.includes(value))) {
        console.log('= -> toCalculate');
        try {
            let result: number = this.toCalculate();
            this._value1 = String(result);
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



  toCalculate(): number {
    
    let value1: number = parseFloat(this._value1);
    let value2: number = parseFloat(this._value2);

    console.log(value1);
    console.log(value2);
    
    switch(this._currentOperation) { 
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

