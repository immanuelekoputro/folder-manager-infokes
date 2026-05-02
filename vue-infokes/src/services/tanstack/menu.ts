import { useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";
import { fetchMenu } from "../menu.service";

//

export function useUserProjects(menuId: Ref<number | null>) {
  return useQuery({
    queryKey: ["userProjects", menuId],
    queryFn: () => fetchMenu(null),
  });
}
