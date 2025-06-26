import { useDispatch, useSelector } from "react-redux";
import { addTag } from "../../../features/filter/filterSlice";
import { useGetAllInsightData } from "@/queries/all.insight.query";

const Tag = () => {
    const { data: insightList } = useGetAllInsightData();
    const dispatch = useDispatch();

    // Extract all tags from all insights
    const allTags = insightList?.data?.flatMap(insight => insight.tag || []);
    
    // Remove duplicate tags by their id
    const uniqueTags = allTags?.reduce((acc, tag) => {
        if (!acc.find(t => t.id === tag.id)) {
            acc.push(tag);
        }
        return acc;
    }, []);

    // tag handler
    const tagHandler = (value) => {
        dispatch(addTag(value));
    };

    return (
        <ul className="tags-style-one">
            {uniqueTags?.map((item) => (
                <li
                    className="" // اگر بخواهی active کلاس بر اساس انتخاب‌شده تغییر کند، باید با Redux مقایسه کنی
                    onClick={() => tagHandler(item.name)}
                    key={item.id}
                >
                    {item.name}
                </li>
            ))}
        </ul>
    );
};

export default Tag;
