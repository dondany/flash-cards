import {FormControl, FormGroup} from "@angular/forms";
import {CollectionAddType} from "./collection-add-type";

type CollectionAddFormGroupType = FormGroup<{
  name: FormControl<CollectionAddType['name']>,
  description: FormControl<CollectionAddType['description']>
}>;

export type CollectionAddFormControlType = CollectionAddFormGroupType['controls'];
export type CollectionAddFormValueType = CollectionAddFormGroupType['value'];
