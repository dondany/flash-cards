import {FormControl, FormGroup} from "@angular/forms";
import {AddProjectType} from "./add-project-type";

type AddProjectFormGroupType = FormGroup<{
  name: FormControl<AddProjectType['name']>,
  description: FormControl<AddProjectType['description']>,
  visibility: FormControl<AddProjectType['visibility']>,
}>;

export type AddProjectFormControlType = AddProjectFormGroupType['controls'];
export type AddProjectFormValueType = AddProjectFormGroupType['value'];
