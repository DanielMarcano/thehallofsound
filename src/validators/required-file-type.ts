import { FormControl } from '@angular/forms';

export function requiredFileType(type: string): any {
  return (control: FormControl): any => {
    const file = control.value;

    if (file) {
      const extension = file.name.split('.')[1].toLowerCase();

      if (!type.toLowerCase().includes(extension.toLowerCase())) {
        return {
          requiredFileType: true,
        };
      }

      return null;
    }

    return null;
  };
}
