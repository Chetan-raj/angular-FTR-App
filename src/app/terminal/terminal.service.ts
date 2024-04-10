import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Terminal } from './terminal';

@Injectable({
  providedIn: 'root'
})
export class TerminalService {

  constructor(private http:HttpClient) { }

  public deleteTerminal(terminalId:number)
  {
     return this.http.delete("http://localhost:8888/ftr/terminals/"+terminalId,{responseType:'text' as 'json'})
  }

  public insertTerminal(terminal:Terminal)
  {
    return this.http.post("http://localhost:8888/ftr/terminals",terminal)
  }

  public updateTerminal(terminalId:number,newCapacity:number)
  {
    return this.http.put("http://localhost:8888/ftr/terminals/"+terminalId+"/"+newCapacity,{responseType:'text' as 'json'})
  }

  public fetchTerminalById(terminalId:number)
  {
    return this.http.get("http://localhost:8888/ftr/terminals/fetchTerminalByTerminalId/"+terminalId)
  }

  public fetchTerminalByType(itemType:string)
  {
    return this.http.get("http://localhost:8888/ftr/terminals/fetchTerminalsByItemType/"+itemType)
  }

  public fetchFTRTerminals()
  {
    return this.http.get("http://localhost:8888/ftr/terminals")
  }
}

