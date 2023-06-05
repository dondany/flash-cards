import {FormControl, FormGroup} from "@angular/forms";
import {FlashCardNewTypes} from "./flash-card-new-types";

type FlashCardNewFormGroupType = FormGroup<{
  front: FormControl<FlashCardNewTypes['front']>,
  back: FormControl<FlashCardNewTypes['back']>,
}>;

export type FlashCardNewFormControlType = FlashCardNewFormGroupType['controls'];
export type FlashCardNewValueType = FlashCardNewFormGroupType['value'];
