interface Profile {
  backgroundColor: string;
  name: Item<string>;
  avatar: Item<string>;
  tag: Item<Tag[]>;
  introduction: Item<string>;
  social: Item<Social[]>;
  resume: Experience[];
}

interface Item<T> {
  x: number;
  y: number;
  context: T;
}

interface Tag {
  id: number;
  emoji: string;
  text: string;
}

interface Social {
  id: number;
  emoji: string;
  link: string;
}

interface Experience {
  id: number;
  start: number;
  end: number;
  title: string;
  description?: string;
}

export type { Profile, Item, Tag, Social, Experience };
