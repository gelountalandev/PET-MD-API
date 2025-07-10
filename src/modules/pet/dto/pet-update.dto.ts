import { PetDTO } from "./pet-register.dto";
import { PartialType} from "@nestjs/mapped-types"

export class PetUpdateDTO extends PartialType (PetDTO) { }