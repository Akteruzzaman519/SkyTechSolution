import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight'
})

export class HighlightPipe implements PipeTransform {

    transform(value: any, args: any): any {
        if(!args) { return value; }
		if(!value) { return value; }

        var re = new RegExp(args, 'gi'); 
		return value.replace(re, (match: any) => {
			return `<span class="highlighted-text">${match}</span>`;
        });
    }
}