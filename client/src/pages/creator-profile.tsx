import { useState, useEffect } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Users, 
  Image as ImageIcon, 
  Calendar, 
  UserPlus, 
  UserMinus,
  Loader2,
  BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar } from "@/components/sidebar";
import { socialApi } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
}

export default function CreatorProfile() {
  const [, params] = useRoute("/creator/:id");
  const creatorId = params?.id;
  const { toast } = useToast();

  const [profile, setProfile] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    if (!creatorId) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [profileData, imagesData] = await Promise.all([
          socialApi.getCreatorProfile(creatorId),
          socialApi.getCreatorImages(creatorId, 50)
        ]);
        setProfile(profileData);
        setImages(imagesData.images);
        setIsFollowing(profileData.isFollowing);
        setFollowerCount(profileData.followerCount);
      } catch (error) {
        console.error("Failed to load creator profile:", error);
        toast({ title: "Error", description: "Failed to load creator profile", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [creatorId, toast]);

  const handleFollowToggle = async () => {
    if (!creatorId) return;
    setIsFollowLoading(true);
    try {
      if (isFollowing) {
        const result = await socialApi.unfollowUser(creatorId);
        setIsFollowing(result.isFollowing);
        setFollowerCount(result.followerCount);
        toast({ title: "Unfollowed", description: `You unfollowed @${profile?.username || 'this creator'}` });
      } else {
        const result = await socialApi.followUser(creatorId);
        setIsFollowing(result.isFollowing);
        setFollowerCount(result.followerCount);
        toast({ title: "Following!", description: `You are now following @${profile?.username || 'this creator'}` });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to update follow status. Please sign in.", variant: "destructive" });
    } finally {
      setIsFollowLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-[#FAFAF9] dark:bg-[#09090B]">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#f8991c]" />
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-screen bg-[#FAFAF9] dark:bg-[#09090B]">
        <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-lg text-charcoal-600 dark:text-charcoal-400">Creator not found</p>
          <Link href="/discover">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Discover
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#FAFAF9] dark:bg-[#09090B]">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link href="/discover">
            <Button variant="ghost" className="mb-6" data-testid="button-back">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Discover
            </Button>
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-[#111113] rounded-2xl border border-[#E4E4E7] dark:border-[#1F1F23] p-6 md:p-8 mb-8"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-[#f8991c]/20">
                <AvatarImage src={profile.profileImageUrl || undefined} />
                <AvatarFallback className="bg-gradient-to-br from-[#f8991c] to-[#B8860B] text-white text-3xl font-bold">
                  {(profile.displayName || profile.username || "U")[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold text-charcoal-900 dark:text-white">
                    {profile.displayName || profile.username || "Creator"}
                  </h1>
                  <BadgeCheck className="h-6 w-6 text-[#f8991c]" />
                </div>
                {profile.username && (
                  <p className="text-charcoal-500 dark:text-charcoal-400 mb-3">@{profile.username}</p>
                )}
                {profile.bio && (
                  <p className="text-charcoal-700 dark:text-charcoal-300 mb-4 max-w-2xl">{profile.bio}</p>
                )}

                <div className="flex flex-wrap items-center gap-6 mb-4">
                  <div className="flex items-center gap-2 text-charcoal-600 dark:text-charcoal-400">
                    <Users className="h-4 w-4" />
                    <span className="font-semibold text-charcoal-900 dark:text-white">{followerCount}</span>
                    <span>followers</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal-600 dark:text-charcoal-400">
                    <Users className="h-4 w-4" />
                    <span className="font-semibold text-charcoal-900 dark:text-white">{profile.followingCount}</span>
                    <span>following</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal-600 dark:text-charcoal-400">
                    <ImageIcon className="h-4 w-4" />
                    <span className="font-semibold text-charcoal-900 dark:text-white">{profile.imageCount}</span>
                    <span>creations</span>
                  </div>
                  <div className="flex items-center gap-2 text-charcoal-600 dark:text-charcoal-400">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {formatDate(profile.createdAt)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleFollowToggle}
                  disabled={isFollowLoading}
                  className={cn(
                    "px-6",
                    isFollowing 
                      ? "bg-charcoal-200 dark:bg-charcoal-700 text-charcoal-900 dark:text-white hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400" 
                      : "bg-[#f8991c] hover:bg-[#e88a17] text-white"
                  )}
                  data-testid="button-follow-toggle"
                >
                  {isFollowLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : isFollowing ? (
                    <>
                      <UserMinus className="h-4 w-4 mr-2" />
                      Following
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Follow
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>

          <h2 className="text-xl font-semibold text-charcoal-900 dark:text-white mb-4">
            Public Creations
          </h2>

          {images.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-[#111113] rounded-2xl border border-[#E4E4E7] dark:border-[#1F1F23]">
              <ImageIcon className="h-12 w-12 mx-auto text-charcoal-400 mb-4" />
              <p className="text-charcoal-600 dark:text-charcoal-400">No public creations yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative aspect-square bg-charcoal-100 dark:bg-charcoal-800 rounded-xl overflow-hidden cursor-pointer"
                  data-testid={`image-card-${image.id}`}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.prompt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-white text-xs line-clamp-2">{image.prompt}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
