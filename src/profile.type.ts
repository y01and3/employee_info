interface Profile {
  name: Item<string>;
  avatar: Item<string>;
  tag: Item<Tag[]>;
  introduction: Item<string>;
  social: Item<Social[]>;
  resume: Item<Experience[]>;
}

interface Item<T> {
  gridX: number;
  gridY: number;
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
}

export type { Profile, Item, Tag, Social, Experience };
