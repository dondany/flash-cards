import {FormControl, FormGroup} from "@angular/forms";
import {CollectionSettingsType} from "./collection-settings-type";

type CollectionSettingsFormGroupType = FormGroup<{
  name: FormControl<CollectionSettingsType['name']>,
  description: FormControl<CollectionSettingsType['description']>
}>;

export type CollectionSettingsFormControlType = CollectionSettingsFormGroupType['controls'];
export type CollectionSettingsValueType = CollectionSettingsFormGroupType['value'];
