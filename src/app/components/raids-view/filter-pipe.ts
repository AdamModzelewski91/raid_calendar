import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filterPlayers',
})

export class FilterPipe implements PipeTransform{
  transform(values: any[], search: any[], startFilter: boolean[], globalIndex: number, index: number, dummy: number) {  
    return startFilter && index === 0 
      ? values.filter(item => search[globalIndex].find((s: any) => item.player === s.player)) 
      : values;
  }
}