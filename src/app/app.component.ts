import { Component, OnInit } from '@angular/core';
import Handsontable from 'handsontable';
import { HotRegisterer } from 'angular-handsontable/index';
import { CustomEditorService } from './custom-editor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'app';
  instance: string = 'hot';
  columns: object[] = [{ type: 'date', dateFormat: 'MM/DD/YYYY' }, {}, {}];

  mycolumns = [
    { type: 'date', dateFormat: 'MM/DD/YYYY' },
    { data: 'mycustomcolumn', title: 'Input Name', editor: 'customselecteditor' },
  ];

  constructor(private _hotRegisterer: HotRegisterer,  private customeditor: CustomEditorService) { }

  ngOnInit() {
    Handsontable.editors.registerEditor('customselecteditor', this.customeditor.SelectEditor);
  }

  getData() {
    console.log(this._hotRegisterer.getInstance(this.instance).getData())
  }

  addColumn() {
    this.columns.push({});
    console.log(this.columns);
  }

  removeColumn() {
    this.columns.pop();
  }

  exportFile() {
    console.log(this);
    var exportPlugin = this._hotRegisterer.getInstance(this.instance).getPlugin('exportFile');
    exportPlugin.downloadFile('csv', { filename: 'MyFile' });
  }

  setBg() {
    this._hotRegisterer.getInstance(this.instance).setCellMeta(0, 0, 'className', 'newClass');
    this._hotRegisterer.getInstance(this.instance).render();
  }
}
