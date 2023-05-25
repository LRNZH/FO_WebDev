interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseDescription extends CoursePartBase {
    description: string;
}

interface CoursePartBasic extends CourseDescription {
    kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CourseDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

export type TotalProps = {
  parts: CoursePart[];
};

export type HeaderProps = {
  name: string;
};

export type ContentProps = {
  parts: CoursePart[];
};
