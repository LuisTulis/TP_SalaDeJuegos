import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast : ToastrService) { }

  showSuccess(titulo : string, cuerpo : string)
  {
    this.toast.success(cuerpo, titulo);
  }

  showError(titulo : string, cuerpo : string)
  {
    this.toast.error(cuerpo, titulo);
  }
}
