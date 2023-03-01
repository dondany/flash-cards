import { Injectable } from '@angular/core';
import {HttpResponse} from "@angular/common/http";
import {Paging} from "../paging";
import {Link} from "../link";

@Injectable({
  providedIn: 'root'
})
export class PagingService {

  constructor() { }

  extractPaging(response: HttpResponse<any>): Paging | undefined {
    const count = response.headers.get("x-total-count");
    const number = response.headers.get("x-page-number");
    const size = response.headers.get("x-page-size");
    const pages = response.headers.get("x-total-pages");
    let linkHeader = response.headers.get("Link");

    if (!count || !number || !size || !pages || !linkHeader) {
      return undefined;
    }

    const paging: Paging = {
      totalCount: parseInt(count, 10),
      pageNumber: parseInt(number, 10),
      pageSize: parseInt(size, 10),
      totalPages: parseInt(pages, 10)
    }

    let headerLinks: Link[] = [];

    if (linkHeader) {
      let links = linkHeader.split(",");
      for(let i = 0; i < links.length; i++) {
        let relRegex = /rel="([^"]+)/g;
        const link = links[i];
        const linkParts = link.split("; ");
        const href = linkParts[0].slice(1, -1).replace("http:/", "http://");
        const relReg = relRegex.exec(linkParts[1]);
        if (relReg) {
          const rel = relReg[1];
          headerLinks.push({href, rel})
          relRegex.lastIndex = 0;
        }
      }
    }

    paging.first = headerLinks.find(h => h.rel === "first")
    paging.prev = headerLinks.find(h => h.rel === "prev")
    paging.self = headerLinks.find(h => h.rel === "self")
    paging.next = headerLinks.find(h => h.rel === "next")
    paging.last = headerLinks.find(h => h.rel === "last")

    return paging;
  }
}
