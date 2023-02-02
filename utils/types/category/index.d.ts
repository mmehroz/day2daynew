export interface SidebarTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: JSX;
  title: string;
  hide?: boolean;
}

export interface CategoriesProps {
  name: string;
  slug: string;
  child: Array<Categories>;
}

interface Categories {
  name: string;
  slug: string;
  child: Array<CategoriesSecond>;
}

interface CategoriesSecond {
  name: string;
  slug: string;
}

export interface FiltersTypes {
  id: string;
  name: string;
}

export interface ParentChildCategory {
  name: string;
  slug: string;
  id: string;
}
