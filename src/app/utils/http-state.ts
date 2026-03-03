import {HttpErrorResponse} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {firstValueFrom, Observable} from 'rxjs';

export interface HttpState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
}

interface RequestOptions<T> {
  request: Observable<T>;
  onSuccess?: (data: T) => void;
}

@Injectable({providedIn: 'root'})
export class HttpStateService<T> {
  data = signal<T | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);
  isSuccess = signal(false);
  toast = inject(ToastrService);

  reset() {
    this.data.set(null);
    this.isLoading.set(false);
    this.error.set(null);
    this.isSuccess.set(false);
  }

  async request({request, onSuccess}: RequestOptions<T>): Promise<T> {
    this.reset();
    this.isLoading.set(true);

    try {
      const result = await firstValueFrom(request);
      this.data.set(result);
      this.isSuccess.set(true);
      onSuccess && onSuccess(result);
      return result;
    } catch (err: any) {
      this.handleError(err);
      throw err;
    } finally {
      this.isLoading.set(false);
    }
  }
  private handleError(error: HttpErrorResponse) {
    this.toast.error("Une erreur s'est produite");
  }
}
