import { Component, OnInit } from '@angular/core';
import { CalculatorLogic } from './calculator-logic';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  private _calculatorLogical: CalculatorLogic = new CalculatorLogic();

  constructor() { }

  ngOnInit(): void {
  }

  clickOnButton(value: string) {
    this._calculatorLogical.input(value);
  }

  getDisplayValue(): string {
    return this._calculatorLogical.display();
  }

}
