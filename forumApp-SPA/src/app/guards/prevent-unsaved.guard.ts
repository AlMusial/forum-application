import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProfileEditComponent } from '../profiles/profile-edit/profile-edit.component';

@Injectable()
export class PreventUnsaved implements CanDeactivate<ProfileEditComponent> { // ktorego komponentu dotyczy
    canDeactivate(component: ProfileEditComponent) { // ()zeby miec dostep do formularza edycji
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue? There is some unsaved changes');
        }
        return true;
    }
}
