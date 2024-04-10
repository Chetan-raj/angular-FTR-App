import { Component, OnInit } from '@angular/core';
import { Terminal } from './terminal';
import { TerminalService } from './terminal.service';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css']
})
export class TerminalComponent implements OnInit {

  constructor(private service:TerminalService) { }

  terminal:Terminal= new Terminal(0,"","","","",0,"","",0);
  message:any;
  updateMessage:any;
  //showTerminal:Terminal=new Terminal(0,"","","","",0,"","",0);
  showTerminal:any;
  deleteTerminal!:boolean;
  updateTerminal!:boolean;
  fetchTerminalById!:boolean;
  fetchTerminalByType!:boolean;
  fetchFTRTerminals!:boolean;
  insertTerminal!:boolean;
  showInsertForm!:boolean;
  showInsertedDetails!:boolean;
  ShowFetchByIdDetails!:boolean;
  showFetchByTypeDetails!:boolean;

  ngOnInit(): void {
  }

  public deleteIcon()
  {
    this.deleteTerminal=true;
    this.updateTerminal=false;
    this.fetchTerminalById=false;
    this.fetchTerminalByType=false;
    this.fetchFTRTerminals=false;
    this.insertTerminal=false;
  }
  public updateIcon()
  {
    this.updateTerminal=true;
    this.deleteTerminal=false;
    this.fetchTerminalById=false;
    this.fetchTerminalByType=false;
    this.fetchFTRTerminals=false;
    this.insertTerminal=false;
  }
  public fetchTerminalByIdIcon()
  {
    this.updateTerminal=false;
    this.deleteTerminal=false;
    this.fetchTerminalById=true;
    this.fetchTerminalByType=false;
    this.fetchFTRTerminals=false;
    this.insertTerminal=false;
    this.ShowFetchByIdDetails=false;

  }
  public fetchTerminalByTypeIcon()
  {
    this.updateTerminal=false;
    this.deleteTerminal=false;
    this.fetchTerminalById=false;
    this.fetchTerminalByType=true;
    this.fetchFTRTerminals=false;
    this.insertTerminal=false;
    this.showFetchByTypeDetails=false;
  }
  /*public fetchFTRTerminalsIcon()
  {
    this.updateTerminal=false;
    this.deleteTerminal=false;
    this.fetchTerminalById=false;
    this.fetchTerminalByType=false;
    this.fetchFTRTerminals=true;
  }*/
  public insertTerminalIcon()
  {
    this.updateTerminal=false;
    this.deleteTerminal=false;
    this.fetchTerminalById=false;
    this.fetchTerminalByType=false;
    this.fetchFTRTerminals=false;
    this.insertTerminal=true;
    this.showInsertForm=true;
    this.showInsertedDetails=false;
  }

  public deleteTerminalNow()
  {
    this.service.deleteTerminal(this.terminal.terminalId).subscribe(data =>this.message=data);
  }

  public updateTerminalNow()
  {
    this.service.updateTerminal(this.terminal.terminalId,this.terminal.capacity).subscribe(data=>this.updateMessage=data);
  }

  public fetchTerminalByIdNow()
  {
    
    this.ShowFetchByIdDetails=true;
    this.service.fetchTerminalById(this.terminal.terminalId).subscribe((data:any)=>this.showTerminal=data);
  }

  public fetchTerminalByTypeNow()
  {
    this.showFetchByTypeDetails=true;
    this.service.fetchTerminalByType(this.terminal.itemType).subscribe((data:any)=>this.showTerminal=data);
  }

  public fetchFTRTerminalsNow()
  {
    this.updateTerminal=false;
    this.deleteTerminal=false;
    this.fetchTerminalById=false;
    this.fetchTerminalByType=false;
    this.fetchFTRTerminals=true;
    this.insertTerminal=false;
    this.service.fetchFTRTerminals().subscribe((data:any)=>this.showTerminal=data);
  }

  public insertTerminalNow()
  {
    this.showInsertForm=false;
    this.showInsertedDetails=true;
    this.service.insertTerminal(this.terminal).subscribe((data:any)=>this.showTerminal=data)
    
  }

}



