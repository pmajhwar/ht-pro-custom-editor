import { Injectable } from '@angular/core';
import Handsontable from 'handsontable-pro';
import { devicetypes } from './project-device-types';

@Injectable()
export class CustomEditorService {
  instance: any;
  select: HTMLElement;

  public SelectEditor = Handsontable.editors.BaseEditor.prototype.extend();

  constructor() {

    this.SelectEditor.prototype.init = function () {
      this.select = document.createElement('UL') as HTMLElement;
      Handsontable.dom.addClass(this.select, 'htSelectEditor');
      Handsontable.dom.addClass(this.select, 'list-group');
      this.select.style.display = 'none';

      // Attach node to DOM, by appending it to the container holding the table
      this.instance.rootElement.appendChild(this.select);
    };
    this.SelectEditor.prototype.prepareOptions = function (optionsToPrepare) {
    
    };

    this.SelectEditor.prototype.focus = function () {
      //this.editorInput.focus();
    };


    this.SelectEditor.prototype.prepare = function () {
      // Remember to invoke parent's method
      Handsontable.editors.BaseEditor.prototype.prepare.apply(this, arguments);

     
      Handsontable.dom.empty(this.select);

      var innerLI = document.createElement('LI') as HTMLElement;
      Handsontable.dom.addClass(innerLI, 'list-group-item');

      var searchElement = document.createElement('INPUT') as HTMLInputElement;
      searchElement.type = 'SEARCH';
      innerLI.appendChild(searchElement);
      this.select.appendChild(innerLI);
      devicetypes.forEach((deviceType, index) => {


        var innerLI = document.createElement('LI') as HTMLElement;
        Handsontable.dom.addClass(innerLI, 'list-group-item');
        innerLI.innerText = deviceType.DeviceType;
        
        innerLI.setAttribute("data-toggle", "collapse");
        innerLI.setAttribute("aria-expanded", "false");
        innerLI.setAttribute("aria-controls", index.toString());
        innerLI.setAttribute("data-target", "#"+index);


        var innerLIST = document.createElement('UL') as HTMLElement;
        Handsontable.dom.addClass(innerLIST, 'list-group');
        Handsontable.dom.addClass(innerLIST, 'collapse');
        Handsontable.dom.addClass(innerLIST, 'multi-collapse');        
        innerLIST.setAttribute("id", index.toString());

        innerLI.appendChild(innerLIST);

        deviceType.Devices.forEach((device) => {
          this.select.appendChild(innerLI);
          var optionElement = document.createElement('LI') as HTMLElement;
          optionElement.innerText = device;
          Handsontable.dom.addClass(optionElement, 'list-group-item');
          innerLIST.appendChild(optionElement);
        });

        
      });

    }


    this.SelectEditor.prototype.setValue = function (value) {
      this.select.value = value;
    };
    this.SelectEditor.prototype.getValue = function () {
      return this.select.value;
    };
    this.SelectEditor.prototype.open = function () {
      var width = Handsontable.dom.outerWidth(this.TD);
      var height = Handsontable.dom.outerHeight(this.TD);
      var rootOffset = Handsontable.dom.offset(this.instance.rootElement);
      var tdOffset = Handsontable.dom.offset(this.TD);
    
      // sets select dimensions to match cell size
      this.select.style.height = height + 'px';
      this.select.style.minWidth = width + 'px';
    
      // make sure that list positions matches cell position
      this.select.style.top = tdOffset.top - rootOffset.top + 'px';
      this.select.style.left = tdOffset.left - rootOffset.left + 'px';
      this.select.style.margin = '0px';
    
      // display the list
      this.select.style.display = '';

      // this.instance.addHook('beforeKeyDown', this.onBeforeKeyDown);
    };


    this.SelectEditor.prototype.close = function () {
      this.select.style.display = 'none';
    };

    this.SelectEditor.prototype.checkEditorSection = function () {
 
    };
  }
}
