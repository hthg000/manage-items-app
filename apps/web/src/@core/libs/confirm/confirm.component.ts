import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { Observable, Subject } from 'rxjs'

@Component({
	standalone: true,
	selector: 'app-confirm',
	templateUrl: './confirm.component.html',
	host: { style: 'app-confirm' },
	imports: [CommonModule]
})
export class ConfirmComponent {
	public isShow: boolean = false
	public isAccept: boolean = false

	private _confirmSubject = new Subject<boolean>()

	/**
	 * @return {Observable<boolean>}
	 */
	public confirm(): Observable<boolean> {
		return this._confirmSubject.asObservable()
	}

	/**
	 * @param {string} id
	 * @return {void}
	 */
	protected onClose(): void {
		this.isShow = false
	}

	/**
	 * @return {void}
	 */
	protected onConfirm(): void {
		this.isAccept = true
		this._confirmSubject.next(this.isAccept)
		setTimeout(() => {
			this.isShow = false
		}, 600)
	}
}
