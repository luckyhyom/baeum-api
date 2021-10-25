import { PartialType } from "@nestjs/mapped-types";
import { CreateLectureDTO } from "./create-lecture.dto";

export class UpdateLectureDTO extends PartialType(CreateLectureDTO) {}