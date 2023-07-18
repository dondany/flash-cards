import {FormControl, FormGroup} from "@angular/forms";
import {AddPracticeType} from "./add-practice-type";

type AddPracticeFormGroupType = FormGroup<{
  name: FormControl<AddPracticeType['name']>,
  description: FormControl<AddPracticeType['description']>,
  type: FormControl<AddPracticeType['type'] | undefined>,
  projectId: FormControl<AddPracticeType['projectId'] | undefined>,
  collectionIds: FormControl<AddPracticeType['collectionIds']>
}>;

export type AddPracticeFormControlType = AddPracticeFormGroupType['controls'];
export type AddPracticeFormValueType = AddPracticeFormGroupType['value'];
