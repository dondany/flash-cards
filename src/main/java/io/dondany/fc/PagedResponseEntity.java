package io.dondany.fc;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * Extension of {@link ResponseEntity} that includes {@link HttpHeaders} with the pagination links
 *
 * @param <T> the body type
 */
public class PagedResponseEntity<T> extends ResponseEntity<Page<T>> {

    public static <T> PagedResponseEntity<T> from(Page<T> page, String path) {
        return new PagedResponseEntity<>(page, createPagingHeaders(page, path), HttpStatus.OK);
    }

    private PagedResponseEntity(Page<T> page, HttpHeaders headers, HttpStatus status) {
        super(page, headers, status);
    }

    private static HttpHeaders createPagingHeaders(Page<?> page, String path) {

        StringBuilder linkHeader = new StringBuilder();

        String url = buildPageUrl(page.getPageable(), path);
        linkHeader.append(buildLinkHeader(url, "self"));

        if (!page.isFirst()) {
            url = buildPageUrl(page.previousOrFirstPageable(), path);
            linkHeader.append(",");
            linkHeader.append(buildLinkHeader(url, "first"));
        }

        if (page.hasPrevious()) {
            url = buildPageUrl(page.previousPageable(), path);
            linkHeader.append(",");
            linkHeader.append(buildLinkHeader(url, "prev"));
        }

        if (page.hasNext()) {
            url = buildPageUrl(page.nextPageable(), path);
            linkHeader.append(",");
            linkHeader.append(buildLinkHeader(url, "next"));
        }

        if (!page.isLast()) {
            url = buildPageUrl(page.nextOrLastPageable(), path);
            linkHeader.append(",");
            linkHeader.append(buildLinkHeader(url, "last"));
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Total-Count", String.valueOf(page.getTotalElements()));
        headers.add("X-Page-Number", String.valueOf(page.getNumber()));
        headers.add("X-Page-Size", String.valueOf(page.getSize()));
        headers.add("X-Total-Pages", String.valueOf(page.getTotalPages()));
        headers.add(HttpHeaders.LINK, linkHeader.toString());

        return headers;
    }

    private static String buildPageUrl(Pageable pageable, String path) {
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromPath(path)
                .queryParam("page", pageable.getPageNumber())
                .queryParam("size", pageable.getPageSize());
        return uriBuilder.toUriString();
    }

    private static String buildLinkHeader(String url, String rel) {
        return "<" + url + ">; rel=\"" + rel + "\"";
    }

}
