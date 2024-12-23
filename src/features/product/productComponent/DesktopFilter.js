const DesktopFilter = ({ handleFilter, filters }) => {
  return (
    <form className="hidden lg:block">
      {filters.map((section) => (
        <div key={section.id} className="border-b border-gray-200 py-6">
          <h3 className="text-sm font-medium text-gray-900">{section.name}</h3>
          <div className="mt-4 space-y-4">
            {section.options.map((option, optionIdx) => (
              <div key={option.value} className="flex items-center">
                <input
                  id={`filter-${section.id}-${optionIdx}`}
                  name={`${section.id}[]`}
                  defaultValue={option.value}
                  type="checkbox"
                  defaultChecked={option.checked}
                  onChange={(e) => handleFilter(e, section, option)}
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label
                  htmlFor={`filter-${section.id}-${optionIdx}`}
                  className="ml-3 text-sm text-gray-600"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </form>
  );
};

export default DesktopFilter;
