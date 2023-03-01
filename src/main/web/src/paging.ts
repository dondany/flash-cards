import {Link} from "./link";

export interface Paging {
  totalCount?: number | null,
  pageNumber?: number | null,
  pageSize?: number | null,
  totalPages?: number | null,
  first?: Link,
  prev?: Link,
  self?: Link,
  next?: Link,
  last?: Link
}
