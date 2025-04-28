interface Profile {
  name: Item<string>;
  tag: Item<Tag[]>;
  introduction: Item<string>;
  social: Item<Social[]>;
  post?: Item<Post[]>;
  resume?: Item<Experience[]>;
}

interface Item<T> {
  top: number;
  left: number;
  context: T;
}

interface Tag {
  icon: string;
  text: string;
}

interface Social {
  icon: string;
  link: string;
}

interface Post {
  title: string;
  description: string;
  date: Date;
  link: string;
}

interface Experience {
  start: Date;
  end: Date;
  title: string;
}

export type { Profile, Item, Tag, Social, Post, Experience };
