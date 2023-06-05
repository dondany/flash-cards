import {FormControl, FormGroup} from "@angular/forms";
import {ProjectSettingsType} from "./project-settings-type";

type ProjectSettingsFormGroupType = FormGroup<{
  name: FormControl<ProjectSettingsType['name']>,
  description: FormControl<ProjectSettingsType['description']>,
  visibility: FormControl<ProjectSettingsType['visibility']>,
}>;

export type ProjectSettingsFormControlType = ProjectSettingsFormGroupType['controls'];
export type ProjectSettingsValueType = ProjectSettingsFormGroupType['value'];
