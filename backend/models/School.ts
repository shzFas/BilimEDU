import mongoose, { Document, Schema } from "mongoose";

interface ISchool extends Document {
  id: number;
  name: string;
  id_cto: number;
  students: IStudent[];
  teachers: ITeacher[];
  marks: IMark[];
  subjectList: ISubject[];
  ktpList: IKTP[];
};

interface IStudent {
  id: number;
  name: string;
  class_id: number;
  class_name: string;
};

interface ITeacher {
  id: number;
  name: string;
  subject_id: number;
  subject_name: string;
  classes: {
    class_id: number;
    class_name: string;
  }[];
};

interface IMark {
  id: number;
  ktpId: number;
  markValue: string;
  studentId: number;
};

interface ISubject {
  id: number;
  subjectName: string;
  teacherName: string;
  teacherId: number;
};

interface IKTP {
  id: number;
  subjectId: number;
  subjectName: string;
  teacherId: number;
  teacherName: string;
  dateLesson: string;
};

const studentSchema = new Schema({
  id: Number,
  name: String,
  class_id: Number,
  class_name: String,
});

const teacherSchema = new Schema({
  id: Number,
  name: String,
  subject_id: Number,
  subject_name: String,
  classes: [
    {
      class_id: Number,
      class_name: String,
    },
  ],
});

const markSchema = new Schema({
  id: Number,
  ktpId: Number,
  markValue: String,
  studentId: Number,
});

const subjectSchema = new Schema({
  id: Number,
  subjectName: String,
  teacherName: String,
  teacherId: Number,
});

const ktpSchema = new Schema({
  id: Number,
  subjectId: Number,
  subjectName: String,
  teacherId: Number,
  teacherName: String,
  dateLesson: String,
});

const schoolSchema = new Schema<ISchool>({
  id: Number,
  name: String,
  id_cto: Number,
  students: [studentSchema],
  teachers: [teacherSchema],
  marks: [markSchema],
  subjectList: [subjectSchema],
  ktpList: [ktpSchema],
});

export const School = mongoose.model<ISchool>("School", schoolSchema);
