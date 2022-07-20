import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform{
  transform(values: any[]) {
    if (!values){
      return values;
    }
    return values.filter(item => item.name)
  }
}