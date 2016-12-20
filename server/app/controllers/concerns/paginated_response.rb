module PaginatedResponse
  extend ActiveSupport::Concern

  included do
    after_action :add_pagination_header, only: [:index]
  end

  def add_pagination_header
    pages = {}
    resources = instance_variable_get("@#{controller_name}").page(params[:page])
    if resources.current_page < resources.total_pages
      pages[:next] = url_with_page(resources.current_page + 1)
    end
    if resources.current_page > 1
      pages[:prev] = url_with_page(resources.current_page - 1)
    end
    pages[:last] = url_with_page(resources.total_pages == 0 ? 1 : resources.total_pages)
    pages[:first] = url_with_page(1)

    headers["Link"] = pages.map{|k, v| "<#{v}> rel=\"#{k}\""}.join('; ')
  end

  def url_with_page(page_no)
    u = URI(request.url)
    u.query = Rack::Utils.parse_query(request.query_string)
      .merge({ page: page_no })
      .to_query
    u
  end
end
